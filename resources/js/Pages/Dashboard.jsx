import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard() {
    return (
        <AuthenticatedLayout
            header={'Dashboard'}
        >
            <Head title="Dashboard" />

            <div className="p-6 bg-white">
                You're logged in!
            </div>
        </AuthenticatedLayout>
    );
}
