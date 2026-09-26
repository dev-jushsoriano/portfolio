<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    public function run(): void
    {
        $email = config('admin.email');
        $password = config('admin.password');

        if (! $email || ! $password) {
            $this->command->error('Set ADMIN_EMAIL and ADMIN_PASSWORD in .env first.');
            return;
        }

        User::firstOrNew(['email' => $email])->forceFill([
            'name' => config('admin.name'),
            'password' => Hash::make($password),
            'email_verified_at' => now(),
        ])->save();

        $this->command->info("Admin account ready: {$email}");
    }
}