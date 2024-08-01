DROP TABLE IF EXISTS job_applications;
DROP TABLE IF EXISTS education;
DROP TABLE IF EXISTS skills;
DROP TABLE IF EXISTS experience;
DROP TABLE IF EXISTS profiles;

-- Create profiles table
CREATE TABLE profiles (
    id uuid PRIMARY KEY,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    bio TEXT,
    profile_picture_url TEXT,
    phone VARCHAR(20),
    email VARCHAR(128),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    -- Foreign key constraint
    CONSTRAINT fk_auth_user
        FOREIGN KEY (id)
        REFERENCES auth.users (id)
        ON DELETE CASCADE
);

-- Create experience table
CREATE TABLE experience (
    id SERIAL PRIMARY KEY,
    user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
    job_title VARCHAR(100),
    company_name VARCHAR(100),
    is_current_job BOOL NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create skills table
CREATE TABLE skills (
    id SERIAL PRIMARY KEY,
    user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
    skill_name VARCHAR(100),
    proficiency_level VARCHAR(50),  -- e.g., Beginner, Intermediate, Expert
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create education table
CREATE TABLE education (
    id SERIAL PRIMARY KEY,
    user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
    institution_name VARCHAR(100),
    degree VARCHAR(100),
    field_of_study VARCHAR(100),
    start_date DATE,
    end_date DATE,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create job_applications table
CREATE TABLE job_applications (
    id SERIAL PRIMARY KEY,
    user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
    application_url VARCHAR(250),
    job_title VARCHAR(100),
    company_name VARCHAR(100),
    application_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(50),
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
