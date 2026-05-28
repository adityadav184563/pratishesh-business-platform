import { createClient } from "@supabase/supabase-js"
import { DEFAULT_SETTINGS } from "@/lib/supabase/mappers"

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

function isPlaceholderValue(value: string | undefined) {
  if (!value) return true
  const placeholderPatterns = [
    "your-project.supabase.co",
    "your-anon-key",
    "your-service-role-key",
    "your-project",
    "your-anon",
    "your-service",
  ]
  return placeholderPatterns.some((pattern) => value.includes(pattern))
}

const localFallbackStore = {
  tech_services: [] as any[],
  legal_services: [] as any[],
  training_courses: [] as any[],
  job_posts: [] as any[],
  inquiries: [] as any[],
  site_settings: [
    {
      id: 1,
      company_name: DEFAULT_SETTINGS.companyName,
      phone: DEFAULT_SETTINGS.phone,
      whatsapp: DEFAULT_SETTINGS.whatsapp,
      email: DEFAULT_SETTINGS.email,
      address: DEFAULT_SETTINGS.address,
      facebook: DEFAULT_SETTINGS.facebook,
      instagram: DEFAULT_SETTINGS.instagram,
      linkedin: DEFAULT_SETTINGS.linkedin,
      footer_text: DEFAULT_SETTINGS.footerText,
      updated_at: new Date().toISOString(),
    },
  ],
}

type TableName = keyof typeof localFallbackStore

function isSupabaseConfigured() {
  return Boolean(
    SUPABASE_URL && SUPABASE_ANON_KEY &&
      !isPlaceholderValue(SUPABASE_URL) &&
      !isPlaceholderValue(SUPABASE_ANON_KEY)
  )
}

export function isSupabaseAvailable() {
  return Boolean(
    SUPABASE_URL &&
    SUPABASE_ANON_KEY &&
    SUPABASE_SERVICE_KEY &&
    !isPlaceholderValue(SUPABASE_URL) &&
    !isPlaceholderValue(SUPABASE_ANON_KEY) &&
    !isPlaceholderValue(SUPABASE_SERVICE_KEY)
  )
}

function createFallbackId() {
  return typeof crypto?.randomUUID === "function"
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(16).slice(2)}`
}

function matchesFilters(row: Record<string, any>, filters: Record<string, any>) {
  return Object.entries(filters).every(([key, value]) => row[key] === value)
}

function createFallbackRow(table: TableName, payload: Record<string, any>) {
  const timestamp = new Date().toISOString()
  if (table === "site_settings") {
    const existing = localFallbackStore.site_settings[0]
    const merged = { ...existing, ...payload, updated_at: timestamp }
    localFallbackStore.site_settings[0] = merged
    return merged
  }

  const row = {
    ...payload,
    id: createFallbackId(),
    created_at: timestamp,
    ...(payload.status ? {} : { status: "active" }),
  }
  localFallbackStore[table].push(row)
  return row
}

function updateFallbackRow(table: TableName, payload: Record<string, any>, filters: Record<string, any>) {
  const rows = localFallbackStore[table]
  const matchIndex = rows.findIndex((row) => matchesFilters(row, filters))
  if (matchIndex === -1) {
    const row = { ...payload, id: filters.id ?? createFallbackId(), created_at: new Date().toISOString() }
    rows.push(row)
    return row
  }
  const updated = { ...rows[matchIndex], ...payload, updated_at: new Date().toISOString() }
  rows[matchIndex] = updated
  return updated
}

function deleteFallbackRow(table: TableName, filters: Record<string, any>) {
  const rows = localFallbackStore[table]
  localFallbackStore[table] = rows.filter((row) => !matchesFilters(row, filters))
}

function getFallbackRows(table: TableName, filters: Record<string, any>) {
  const rows = localFallbackStore[table]
  if (!Object.keys(filters).length) return [...rows]
  return rows.filter((row) => matchesFilters(row, filters))
}

function createFallbackQuery(table: TableName) {
  const state = {
    table,
    operation: "select" as "select" | "insert" | "update" | "delete" | "upsert",
    filters: {} as Record<string, any>,
    payload: {} as Record<string, any>,
    single: false,
  }

  const execute = () => {
    switch (state.operation) {
      case "insert": {
        const data = createFallbackRow(state.table, state.payload)
        return { data, error: null }
      }
      case "upsert": {
        const data = createFallbackRow(state.table, state.payload)
        return { data, error: null }
      }
      case "update": {
        const data = updateFallbackRow(state.table, state.payload, state.filters)
        return { data, error: null }
      }
      case "delete": {
        deleteFallbackRow(state.table, state.filters)
        return { data: null, error: null }
      }
      case "select":
      default: {
        const rows = getFallbackRows(state.table, state.filters)
        return { data: state.single ? rows[0] ?? null : rows, error: null }
      }
    }
  }

  const builder: any = {
    select() {
      state.operation = "select"
      return builder
    },
    order() {
      return builder
    },
    eq(key: string, value: any) {
      state.filters[key] = value
      return builder
    },
    maybeSingle() {
      state.single = true
      return {
        then(resolve: any, reject: any) {
          return Promise.resolve(execute()).then(resolve, reject)
        },
      }
    },
    single() {
      state.single = true
      return builder
    },
    insert(payload: Record<string, any>) {
      state.operation = "insert"
      state.payload = payload
      return builder
    },
    upsert(payload: Record<string, any>) {
      state.operation = "upsert"
      state.payload = payload
      return builder
    },
    update(payload: Record<string, any>) {
      state.operation = "update"
      state.payload = payload
      return builder
    },
    delete() {
      state.operation = "delete"
      return builder
    },
    then(resolve: any, reject: any) {
      return Promise.resolve(execute()).then(resolve, reject)
    },
  }

  return builder
}

function createFallbackClient() {
  return {
    from(table: string) {
      return createFallbackQuery(table as TableName)
    },
  }
}

function getSupabaseUrl() {
  if (!SUPABASE_URL) throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL")
  return SUPABASE_URL
}

/** Anon client — respects RLS (public reads, inquiry inserts) */
export function createPublicClient() {
  if (!isSupabaseConfigured()) {
    return createFallbackClient() as any
  }
  return createClient(getSupabaseUrl(), SUPABASE_ANON_KEY as string)
}

/** Service role — admin API routes only; bypasses RLS */
export function createServiceClient() {
  if (!isSupabaseAvailable()) {
    return createFallbackClient() as any
  }
  return createClient(getSupabaseUrl(), SUPABASE_SERVICE_KEY as string, {
    auth: { persistSession: false, autoRefreshToken: false },
  })
}
