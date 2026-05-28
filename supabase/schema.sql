-- Pratishesh website — Supabase schema
-- Run this in Supabase SQL Editor (Dashboard → SQL → New query)

-- Tech services
CREATE TABLE IF NOT EXISTS tech_services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL DEFAULT 'Globe',
  category TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Legal services
CREATE TABLE IF NOT EXISTS legal_services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL DEFAULT 'Scale',
  category TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Training courses
CREATE TABLE IF NOT EXISTS training_courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_name TEXT NOT NULL,
  duration TEXT NOT NULL DEFAULT '',
  fees TEXT NOT NULL DEFAULT '',
  description TEXT NOT NULL,
  image TEXT NOT NULL DEFAULT '/placeholder.svg',
  placement_support BOOLEAN NOT NULL DEFAULT false,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Job posts
CREATE TABLE IF NOT EXISTS job_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_title TEXT NOT NULL,
  company_name TEXT NOT NULL,
  location TEXT NOT NULL DEFAULT '',
  salary TEXT NOT NULL DEFAULT '',
  qualification TEXT NOT NULL DEFAULT '',
  description TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Contact inquiries
CREATE TABLE IF NOT EXISTS inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL DEFAULT '',
  message TEXT NOT NULL,
  division TEXT NOT NULL DEFAULT 'General',
  status TEXT NOT NULL DEFAULT 'unread' CHECK (status IN ('unread', 'read')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Site settings (single row)
CREATE TABLE IF NOT EXISTS site_settings (
  id INTEGER PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  company_name TEXT NOT NULL DEFAULT 'Pratishesh Associate & Consultancy',
  phone TEXT NOT NULL DEFAULT '',
  whatsapp TEXT NOT NULL DEFAULT '',
  email TEXT NOT NULL DEFAULT '',
  address TEXT NOT NULL DEFAULT '',
  facebook TEXT NOT NULL DEFAULT '',
  instagram TEXT NOT NULL DEFAULT '',
  linkedin TEXT NOT NULL DEFAULT '',
  footer_text TEXT NOT NULL DEFAULT '',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_tech_services_status ON tech_services(status);
CREATE INDEX IF NOT EXISTS idx_legal_services_status ON legal_services(status);
CREATE INDEX IF NOT EXISTS idx_training_courses_status ON training_courses(status);
CREATE INDEX IF NOT EXISTS idx_job_posts_status ON job_posts(status);
CREATE INDEX IF NOT EXISTS idx_inquiries_status ON inquiries(status);

-- Row Level Security
ALTER TABLE tech_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE legal_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE training_courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Public read: active content + settings
DROP POLICY IF EXISTS "public_read_active_tech" ON tech_services;
CREATE POLICY "public_read_active_tech" ON tech_services FOR SELECT USING (status = 'active');

DROP POLICY IF EXISTS "public_read_active_legal" ON legal_services;
CREATE POLICY "public_read_active_legal" ON legal_services FOR SELECT USING (status = 'active');

DROP POLICY IF EXISTS "public_read_active_training" ON training_courses;
CREATE POLICY "public_read_active_training" ON training_courses FOR SELECT USING (status = 'active');

DROP POLICY IF EXISTS "public_read_active_jobs" ON job_posts;
CREATE POLICY "public_read_active_jobs" ON job_posts FOR SELECT USING (status = 'active');

DROP POLICY IF EXISTS "public_read_settings" ON site_settings;
CREATE POLICY "public_read_settings" ON site_settings FOR SELECT USING (true);

DROP POLICY IF EXISTS "public_insert_inquiries" ON inquiries;
CREATE POLICY "public_insert_inquiries" ON inquiries FOR INSERT WITH CHECK (true);

-- Default settings row
INSERT INTO site_settings (id, company_name, phone, whatsapp, email, address, footer_text)
VALUES (
  1,
  'Pratishesh Associate & Consultancy',
  '+91 9517690666',
  '919517690666',
  'info@pratishesh.com',
  'KBC-22 The Businees Arcade Complex, Barabirwa Rd, Sector B, Bargawan, Alambagh, Lucknow, Uttar Pradesh 226012',
  'Technology Solutions, Legal & Compliance, Industrial Training, and Job Placement — empowering businesses across India.'
) ON CONFLICT (id) DO NOTHING;

-- Seed tech services
INSERT INTO tech_services (title, description, icon, category, status, sort_order) VALUES
  ('Website Development', 'Modern, responsive and SEO-friendly business websites built with the latest technologies.', 'Globe', 'Web', 'active', 1),
  ('Flask Development', 'Custom Python Flask web apps with admin panel, database integration and deployment.', 'Code', 'Web App', 'active', 2),
  ('WordPress Development', 'Business, portfolio, blog and service websites using WordPress CMS platform.', 'Layout', 'CMS', 'active', 3),
  ('E-Commerce Website', 'Online store with product listing, enquiry system and payment-ready structure.', 'ShoppingCart', 'E-Commerce', 'active', 4),
  ('Hosting & Domain', 'Domain setup, VPS hosting, SSL certificates and complete website deployment support.', 'Server', 'Infrastructure', 'active', 5),
  ('Website Maintenance', 'Regular updates, backup, speed improvement and ongoing security support.', 'Wrench', 'Support', 'active', 6)
;

-- Seed legal services
INSERT INTO legal_services (title, description, icon, category, status, sort_order) VALUES
  ('GST Registration & Filing', 'Complete GST registration, return filing, and compliance guidance for businesses of all sizes.', 'Receipt', 'Tax', 'active', 1),
  ('ITR Filing', 'Income tax return filing for individuals, professionals and businesses with expert support.', 'FileText', 'Tax', 'active', 2),
  ('MSME Registration', 'MSME/Udyam registration support for small and medium businesses to access government benefits.', 'Landmark', 'Registration', 'active', 3),
  ('Company Registration', 'Private limited, LLP, OPC and other business entity registration with complete documentation.', 'Building2', 'Registration', 'active', 4),
  ('PF & ESIC Compliance', 'Employee compliance management including PF, ESIC registration and payroll-related support.', 'ShieldCheck', 'Compliance', 'active', 5),
  ('Labour Law Compliance', 'LWF, BOCW, statutory compliance services and labour law advisory for employers.', 'Users', 'Compliance', 'active', 6)
;

-- Seed training courses
INSERT INTO training_courses (course_name, duration, fees, description, placement_support, status, sort_order) VALUES
  ('Web Development using Flask', '3-4 months', 'Contact for fees', 'Learn HTML, CSS, Bootstrap, Python Flask, database integration and deployment from scratch.', true, 'active', 1),
  ('HR Executive & Office Management', '2-3 months', 'Contact for fees', 'Office tools, HR process, payroll management, compliance and interview skills training.', true, 'active', 2),
  ('Tally & Accounting', '1-2 months', 'Contact for fees', 'Accounting fundamentals, GST billing, voucher entry and business finance basics with Tally.', false, 'active', 3),
  ('Python Programming', '2-3 months', 'Contact for fees', 'Python fundamentals, logic building, data structures and practical coding projects.', true, 'active', 4),
  ('Java Programming', '2-3 months', 'Contact for fees', 'Java programming support for academic learning, OOP concepts and practical applications.', true, 'active', 5),
  ('O Level Training', 'Varies', 'Contact for fees', 'Computer fundamentals, programming concepts and practical exam preparation for NIELIT O Level.', false, 'active', 6)
;

-- Seed job posts
INSERT INTO job_posts (job_title, company_name, location, salary, qualification, description, status) VALUES
  ('Web Developer Intern', 'Partner Tech Co.', 'Lucknow', 'As per company norms', 'BCA / B.Tech / Diploma', 'Assist in website development using React and Python.', 'active'),
  ('HR Executive', 'Growing Startup', 'Lucknow', '₹15,000 - ₹20,000', 'MBA / BBA HR', 'Handle recruitment, payroll support and employee records.', 'active')
;
