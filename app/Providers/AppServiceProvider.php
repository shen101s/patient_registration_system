<?php

namespace App\Providers;

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        require_once app_path('Helpers/helpers.php');

        // Vite::prefetch(concurrency: 3);
        Schema::defaultStringLength(191);

        Route::bind('patient', function ($value) {
            return \App\Models\TblPatient::where('id', $value)->firstOrFail();
        });
    }
}
