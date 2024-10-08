
DO $$
BEGIN
    -- Check if any of the tables have data
    IF NOT EXISTS (SELECT 1 FROM auth.users)
    AND NOT EXISTS (SELECT 1 FROM accounts)
    AND NOT EXISTS (SELECT 1 FROM experience)
    AND NOT EXISTS (SELECT 1 FROM skills)
    AND NOT EXISTS (SELECT 1 FROM education)
    AND NOT EXISTS (SELECT 1 FROM job_applications) THEN

        -- Insert the first user into auth.users if no user exists with the given ID
        INSERT INTO auth.users (
    id, 
    email, 
    email_confirmed_at, 
    created_at, 
    updated_at, 
    encrypted_password, 
    aud, 
    role, 
    raw_app_meta_data, 
    instance_id, 
    confirmation_token, 
    recovery_token, 
    email_change_token_new, 
    email_change, 
    raw_user_meta_data
) VALUES 
(
    '450e5a17-33f1-448a-9532-cbc66e5e7653'::uuid, 
    'john.doe@example.com', 
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP, 
    CURRENT_TIMESTAMP,
    '$2a$10$WXGlub8225XKnacTF8KpcuSN1/FrvFGLf/ROASh3ftLFLiHoof5HG',
    'authenticated',
    'authenticated',
    '{"provider":"email","providers":["email"]}',
    '00000000-0000-0000-0000-000000000000',
    '',
    '',
    '',
    '',
    '{}'
),
(
    '560e5a17-44f2-448a-9532-cdc66e6e7654'::uuid, 
    'jane.smith@example.com', 
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP, 
    CURRENT_TIMESTAMP,
    '$2a$10$WXGlub8225XKnacTF8KpcuSN1/FrvFGLf/ROASh3ftLFLiHoof5HG',
    'authenticated',
    'authenticated',
    '{"provider":"email","providers":["email"]}',
    '00000000-0000-0000-0000-000000000000',
    '',
    '',
    '',
    '',
    '{}'
);


        -- Insert the first user into accounts if no account exists with the given ID
        INSERT INTO accounts (id, first_name, last_name, bio, profile_picture_url, phone, email)
        VALUES 
            ('450e5a17-33f1-448a-9532-cbc66e5e7653', 
            'John', 
            'Doe', 
            'Experienced software developer with a passion for AI', 
            'https://example.com/johndoe.jpg', 
            '123-456-7890', 
            'john.doe@example.com'),
            ('560e5a17-44f2-448a-9532-cdc66e6e7654', 
            'Jane', 
            'Smith', 
            'Digital marketing expert with extensive experience in brand management', 
            'https://example.com/janesmith.jpg', 
            '098-765-4321', 
            'jane.smith@example.com');

        -- Insert experience records for the first user
        INSERT INTO experience (user_id, job_title, company_name, is_current_job, start_date, end_date, description)
        VALUES
            ('450e5a17-33f1-448a-9532-cbc66e5e7653', 'Senior Developer', 'Tech Corp', true, '2020-01-01', NULL, 'Leading a team of developers on various projects'),
            ('450e5a17-33f1-448a-9532-cbc66e5e7653', 'Junior Developer', 'Startup Inc', false, '2018-06-01', '2019-12-31', 'Worked on frontend development using React'),
            -- Experience for the second user
            ('560e5a17-44f2-448a-9532-cdc66e6e7654', 'Marketing Manager', 'BrandX', true, '2019-05-01', NULL, 'Managing marketing campaigns and brand strategies'),
            ('560e5a17-44f2-448a-9532-cdc66e6e7654', 'Marketing Assistant', 'AdAgency', false, '2017-02-01', '2019-04-30', 'Assisted in creating and implementing marketing strategies');

        -- Insert skills for the first user
        INSERT INTO skills (user_id, skill_name, proficiency_level)
        VALUES
            ('450e5a17-33f1-448a-9532-cbc66e5e7653', 'JavaScript', 'Expert'),
            ('450e5a17-33f1-448a-9532-cbc66e5e7653', 'Python', 'Intermediate'),
            ('450e5a17-33f1-448a-9532-cbc66e5e7653', 'SQL', 'Expert'),
            -- Skills for the second user
            ('560e5a17-44f2-448a-9532-cdc66e6e7654', 'SEO', 'Expert'),
            ('560e5a17-44f2-448a-9532-cdc66e6e7654', 'Content Strategy', 'Intermediate'),
            ('560e5a17-44f2-448a-9532-cdc66e6e7654', 'Google Analytics', 'Expert');

        -- Insert education records for the first user
        INSERT INTO education (user_id, institution_name, degree, field_of_study, start_date, end_date, description)
        VALUES
            ('450e5a17-33f1-448a-9532-cbc66e5e7653', 'Tech University', 'Bachelor of Science', 'Computer Science', '2014-09-01', '2018-05-31', 'Focused on software engineering and AI'),
            -- Education for the second user
            ('560e5a17-44f2-448a-9532-cdc66e6e7654', 'Business School', 'Master of Business Administration', 'Marketing', '2015-09-01', '2017-05-31', 'Specialized in digital marketing and brand management');

        -- Insert job applications for the first user
        INSERT INTO job_applications (user_id, application_url, job_title, company_name, application_date, status, description, notes)
        VALUES
            ('450e5a17-33f1-448a-9532-cbc66e5e7653', 'https://example.com/job1', 'Lead Developer', 'Facebook', '2024-09-01', 'Applied', 'Senior role leading a team of 10 developers', 'Waiting for initial response'),
            ('450e5a17-33f1-448a-9532-cbc66e5e7653', 'https://example.com/job2', 'Digital Marketing Director', 'Uber', '2024-08-15', 'Interview', 'Overseeing all digital marketing efforts', 'Interview scheduled for next week'),
            ('450e5a17-33f1-448a-9532-cbc66e5e7653', 'https://example.com/job3', 'Product Manager', 'Amazon', '2024-07-20', 'Offer', 'Leading product development and strategy', 'Reviewing offer details'),
            ('450e5a17-33f1-448a-9532-cbc66e5e7653', 'https://example.com/job3', 'Software Engineer', 'Spotify', '2024-07-20', 'Rejected', 'Developing new features and maintaining existing codebase', 'Reviewing offer details'),
            -- Job applications for the second user
            ('560e5a17-44f2-448a-9532-cdc66e6e7654', 'https://example.com/job3', 'Senior Marketing Strategist', 'Spotify', '2024-09-10', 'Applied', 'Lead the marketing strategy and execution', 'Awaiting feedback'),
            ('560e5a17-44f2-448a-9532-cdc66e6e7654', 'https://example.com/job4', 'Content Director', 'Google', '2024-07-20', 'Offer', 'Direct content creation and strategy', 'Reviewing offer details');
    END IF;
END $$;