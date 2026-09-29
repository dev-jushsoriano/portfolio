<?php

namespace Database\Seeders;

use App\Models\Project;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class ProjectSeeder extends Seeder
{
    /**
     * Starter content from the CV. Everything is unpublished so nothing
     * goes public until it has been reviewed in the admin panel.
     *
     * firstOrCreate() matches on the slug and only inserts missing
     * projects, so re-running this never overwrites edits made in the admin.
     */
    public function run(): void
    {
        $projects = [
            [
                'title' => 'Enterprise Ticketing & Workflow Automation System',
                'category' => 'system',
                'client' => 'LausGroup of Companies',
                'summary' => 'A centralized ticketing platform that routes support, creative and internal requests to the right team automatically.',
                'solution' => 'Centralized requests for support, creative services and internal tasks in one platform. Tickets are routed automatically by department and business unit, with SMS alerts, email notifications and real-time status updates.',
                'impact' => 'Adopted by 50+ departments, improving operational efficiency and communication across teams.',
                'users_scale' => '50+ departments',
                'is_confidential' => true,
                'is_featured' => true,
            ],
            [
                'title' => 'Customer Relationship Management System',
                'category' => 'system',
                'client' => 'LausGroup of Companies',
                'summary' => 'An in-house CRM built from scratch that centralizes customer data and workflows across the group\'s nationwide operations.',
                'solution' => 'Built a centralized CRM supporting multiple business units, covering lead tracking, customer management, reporting and workflow automation.',
                'impact' => 'Became the system used across the group\'s nationwide operations and remains in use today. Improved collaboration and centralized customer data management.',
                'users_scale' => 'Nationwide operations',
                'is_confidential' => true,
                'is_featured' => true,
            ],
            [
                'title' => 'Call Center Management System',
                'category' => 'system',
                'client' => null,
                'summary' => 'An enterprise platform for customer communication and appointment management with CRM, SMS, email and VoIP calling.',
                'solution' => 'Integrated a CRM database with SMS, email and VoIP calling capabilities, plus scheduling calendars and automated reminders.',
                'impact' => 'Streamlined communication workflows and customer engagement.',
                'is_confidential' => true,
                'is_featured' => true,
            ],
            [
                'title' => 'Human Resources Management System',
                'category' => 'system',
                'client' => null,
                'summary' => 'An internal HR platform with role-based access control, requisition approvals, applicant tracking and hiring analytics.',
                'solution' => 'Built an internal HR platform with role-based access control that supports requisition approvals, applicant tracking and employee lifecycle management, with dashboards for operational insights and reporting.',
                'is_confidential' => true,
            ],
            [
                'title' => 'Recruitment and Career Portal',
                'category' => 'web',
                'client' => null,
                'summary' => 'A web-based recruitment platform for publishing job openings, news and company events and receiving online applications.',
                'solution' => 'Developed a platform that publishes job openings, news and company events and supports online applicant submissions and information management.',
                'is_confidential' => false,
            ],
            [
                'title' => 'Corporate Branding Websites',
                'category' => 'web',
                'client' => null,
                'summary' => 'Responsive corporate websites for multiple brands, with inquiry forms connected to SMS and email notifications.',
                'solution' => 'Developed and maintained multiple corporate websites with responsive, optimized UI/UX. Integrated inquiry forms with SMS and email notifications.',
                'impact' => 'Enhanced digital presence and customer engagement.',
                'users_scale' => '20+ websites',
                'is_confidential' => false,
            ],
            [
                'title' => 'Event Tracking & Verification System',
                'category' => 'system',
                'client' => null,
                'summary' => 'A system for managing attendees, reservations and event activities with ticket verification and real-time monitoring.',
                'solution' => 'Built a system that supports ticket verification and real-time monitoring, with analytics and reporting for large-scale events.',
                'is_confidential' => true,
            ],
            [
                'title' => 'Scheduling and Analytics Dashboard',
                'category' => 'system',
                'client' => null,
                'summary' => 'A centralized scheduling platform for appointments across multiple locations, with performance analytics and automated reports.',
                'solution' => 'Developed a platform that supports appointment management across multiple locations, with performance analytics, automated email reports and visual dashboards for operational monitoring.',
                'is_confidential' => true,
            ],
            [
                'title' => 'Document Tracking System with SMS Notifications',
                'category' => 'system',
                'client' => null,
                'summary' => 'A tracking platform for documents and assets that automatically notifies customers by SMS when items are completed or available.',
                'solution' => 'Developed a platform with status tagging and monitoring that automatically sends SMS notifications to customers upon completion or availability.',
                'is_confidential' => true,
            ],
            [
                'title' => 'Pricing and Cost Management System',
                'category' => 'system',
                'client' => null,
                'summary' => 'Applications for managing pricing and operational costs, with administrative reporting and financial insights.',
                'solution' => 'Created applications that track expenditures, support cost analysis and provide administrative reporting and financial insights.',
                'is_confidential' => true,
            ],
            [
                'title' => 'Event Discovery and Venue Promotion Platform',
                'category' => 'web',
                'client' => null,
                'summary' => 'A web platform that connects businesses with customers through event listings and promotions.',
                'solution' => 'Developed a platform that lets establishments showcase events and special activities, supporting marketing campaigns and event discovery.',
                'impact' => 'Provided improved visibility and audience engagement for participating businesses.',
                'is_confidential' => false,
            ],
            [
                'title' => 'Operations and Monitoring Platform',
                'category' => 'system',
                'client' => null,
                'summary' => 'An all-in-one business management system combining CRM, sales monitoring, equipment tracking and reporting.',
                'solution' => 'Built a platform with CRM capabilities, sales monitoring and reporting that tracks equipment and operational performance and centralizes day-to-day operations and workflow management.',
                'is_confidential' => true,
            ],
        ];

        foreach ($projects as $index => $data) {
            Project::firstOrCreate(
                ['slug' => Str::slug($data['title'])],
                array_merge([
                    'client' => null,
                    'problem' => null,
                    'impact' => null,
                    'users_scale' => null,
                    'tech_stack' => null,
                    'live_url' => null,
                    'is_featured' => false,
                    'is_published' => false,
                    'sort_order' => $index + 1,
                ], $data)
            );
        }

        $this->command->info(count($projects).' projects checked. Review them in /admin before publishing.');
    }
}
