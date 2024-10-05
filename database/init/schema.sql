-- Create accounts table
CREATE TABLE IF NOT EXISTS accounts (
    id uuid PRIMARY KEY,
    email VARCHAR(128) UNIQUE,
    password TEXT,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    bio TEXT,
    profile_picture_url TEXT,
    phone VARCHAR(20),
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    -- Foreign key constraint
    CONSTRAINT fk_auth_user
        FOREIGN KEY (id)
        REFERENCES auth.users (id)
        ON DELETE CASCADE
);

-- Create experience table
CREATE TABLE IF NOT EXISTS experience (
    id SERIAL PRIMARY KEY,
    user_id uuid REFERENCES accounts(id) ON DELETE CASCADE,
    job_title VARCHAR(100),
    company_name VARCHAR(100),
    is_current_job BOOL NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Create skills table
CREATE TABLE IF NOT EXISTS skills (
    id SERIAL PRIMARY KEY,
    user_id uuid REFERENCES accounts(id) ON DELETE CASCADE,
    skill_name VARCHAR(100),
    proficiency_level VARCHAR(50),  -- e.g., Beginner, Intermediate, Expert
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Create education table
CREATE TABLE IF NOT EXISTS education (
    id SERIAL PRIMARY KEY,
    user_id uuid REFERENCES accounts(id) ON DELETE CASCADE,
    institution_name VARCHAR(100),
    degree VARCHAR(100),
    field_of_study VARCHAR(100),
    start_date DATE,
    end_date DATE,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Create job_applications table
CREATE TABLE IF NOT EXISTS job_applications (
    id SERIAL PRIMARY KEY,
    user_id uuid REFERENCES accounts(id) ON DELETE CASCADE,
    application_url VARCHAR(250),
    job_title VARCHAR(100),
    company_name VARCHAR(100),
    application_date TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(50),
    description TEXT,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS file_uploads (
    link TEXT PRIMARY KEY,
    application_id INT REFERENCES job_applications(id) ON DELETE CASCADE,
    size VARCHAR(32),
    name VARCHAR(32),
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

DROP FUNCTION IF EXISTS public.handle_new_user;