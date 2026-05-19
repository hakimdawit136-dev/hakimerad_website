-- Medical Image Portal Schema
-- Tables for patient data, cases, images, and reports

CREATE TABLE IF NOT EXISTS patients (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id VARCHAR(255) NOT NULL,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  date_of_birth DATE,
  gender ENUM('MALE', 'FEMALE', 'OTHER'),
  phone VARCHAR(50),
  address TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS medical_cases (
  id INT AUTO_INCREMENT PRIMARY KEY,
  patient_id INT NOT NULL,
  case_number VARCHAR(50) UNIQUE NOT NULL,
  status ENUM('SUBMITTED', 'IN_PROGRESS', 'COMPLETED', 'REJECTED') DEFAULT 'SUBMITTED',
  submission_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  completed_date TIMESTAMP NULL,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (patient_id) REFERENCES patients(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS medical_images (
  id INT AUTO_INCREMENT PRIMARY KEY,
  case_id INT NOT NULL,
  image_path VARCHAR(500) NOT NULL,
  image_name VARCHAR(255) NOT NULL,
  image_type ENUM('JPEG', 'PNG') NOT NULL,
  upload_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (case_id) REFERENCES medical_cases(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS reports (
  id INT AUTO_INCREMENT PRIMARY KEY,
  case_id INT NOT NULL,
  radiologist_id VARCHAR(255),
  findings TEXT,
  impression TEXT,
  recommendation TEXT,
  report_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (case_id) REFERENCES medical_cases(id) ON DELETE CASCADE,
  FOREIGN KEY (radiologist_id) REFERENCES users(id) ON DELETE SET NULL
);

-- Create indexes for better query performance
CREATE INDEX idx_patients_user_id ON patients(user_id);
CREATE INDEX idx_medical_cases_patient_id ON medical_cases(patient_id);
CREATE INDEX idx_medical_cases_status ON medical_cases(status);
CREATE INDEX idx_medical_images_case_id ON medical_images(case_id);
CREATE INDEX idx_reports_case_id ON reports(case_id);
CREATE INDEX idx_reports_radiologist_id ON reports(radiologist_id);
