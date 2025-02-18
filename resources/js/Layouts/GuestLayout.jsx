

import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="flex min-h-screen flex-col items-center bg-gray-100  sm:justify-center sm:pt-0">
            <div className="overflow-hidden bg-white p-6 shadow-md sm:rounded-lg w-1/2">
                <section className="">
                    <div className="h-full">
                        <div className="flex h-full flex-wrap items-center justify-center lg:justify-between">
                            <div className="shrink-1 mb-12 grow-0 p-2 basis-auto md:mb-0 md:w-9/12 md:shrink-0 lg:w-6/12 xl:w-6/12">
                                <img src="/images/logo.png"  className="w-xs" alt="Logo" />
                            </div>

                            <div className="mb-12 md:mb-0 md:w-8/12 lg:w-5/12 xl:w-5/12">
                                <h4 className="mb-5 pb-1 text-xl font-semibold text-center">Patient Registration System</h4>
                                {children}
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
