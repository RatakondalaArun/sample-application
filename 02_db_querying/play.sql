create table employees (
  id SERIAL primary key,
  name VARCHAR(100),
  department VARCHAR(50),
  salary DECIMAL,
  hired_at TIMESTAMP default NOW()
);

create table projects (
  id SERIAL primary key,
  name VARCHAR(100),
  start_date DATE,
  end_date DATE
);

create table employee_projects (
  employee_id INT references employees(id),
  project_id INT references projects(id),
  primary key (employee_id, project_id) 
);



-- Importing mock data

-- Insert Employees
INSERT INTO employees (name, department, salary, hired_at) VALUES
('Alice Johnson', 'Engineering', 85000.00, '2022-01-15 09:00:00'),
('Bob Smith', 'Marketing', 62000.00, '2021-07-10 10:30:00'),
('Charlie Brown', 'Finance', 70000.00, '2020-03-22 11:00:00'),
('Diana Prince', 'Engineering', 95000.00, '2019-11-01 09:15:00'),
('Ethan Hunt', 'HR', 58000.00, '2023-02-05 14:00:00'),
('Fiona Davis', 'Engineering', 78000.00, '2021-09-17 08:45:00'),
('George Miller', 'Finance', 72000.00, '2020-12-20 16:30:00'),
('Hannah Wilson', 'Marketing', 64000.00, '2022-06-12 13:20:00');

-- Insert Projects
INSERT INTO projects (name, start_date, end_date) VALUES
('Website Redesign', '2022-05-01', '2022-12-15'),
('Mobile App Development', '2023-01-10', '2023-09-30'),
('Marketing Campaign Q1', '2023-02-01', '2023-03-31'),
('Financial Audit 2023', '2023-04-01', '2023-06-15'),
('Employee Onboarding Revamp', '2022-09-01', '2023-01-31');

-- Assign Employees to Projects
INSERT INTO employee_projects (employee_id, project_id) VALUES
(1, 1), -- Alice -> Website Redesign
(1, 2), -- Alice -> Mobile App
(2, 3), -- Bob -> Marketing Campaign
(3, 4), -- Charlie -> Financial Audit
(4, 1), -- Diana -> Website Redesign
(4, 2), -- Diana -> Mobile App
(4, 4), -- Diana -> Mobile App
--(5, 5), -- Ethan -> Onboarding Revamp
(6, 2), -- Fiona -> Mobile App
(7, 4), -- George -> Financial Audit
(8, 3), -- Hannah -> Marketing Campaign
(2, 1), -- Bob -> Website Redesign
(6, 1); -- Fiona -> Website Redesign



--1. Get the top 5 highest paid employees.


select * from employees e 
order by e.salary DESC
limit 5

--2. Count employees per department.

select e.department, count(*) as no_of_employees  
from employees e 
group by e.department
order by no_of_employees DESC


--3. Find employees not assigned to any project.
-- Ethan does not have any projects
select * from employees e 
left join employee_projects ep on e.id = ep.employee_id
where ep.project_id is NULL


-- 4. List employees working on more than 2 projects.
select ep.employee_id,e."name", count(*) as project_count  
from employees e 
join employee_projects ep on e.id = ep.employee_id
group by ep.employee_id, e."name"
HAVING COUNT(ep.employee_id) > 1
order by project_count



