import DangerButton from "@/Components/DangerButton";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import Select from "@/Components/Select";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";

const Actions = ({ genders, res={} }) => {
    const { data, setData, post, put, delete: destroy, processing, errors } = useForm({
        first_name: res.first_name || '',
        last_name: res.last_name || '',
        date_of_birth: res.date_of_birth || '',
        gender: res.gender || '',
        contact_number: res.contact_number || '',
        email : res.email || '',
        address: res.address || '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        if (res.id) {
            put(route('patients.update', res.id));
        } else {
            post(route('patients.store'));
        }
    }

    const handleDelete = (e, id) => {
        e.preventDefault();

        if (confirm("Are you sure you want to delete this patient?")) {
            destroy(route("patients.destroy", id));
        }
    };

    return (
        <AuthenticatedLayout
            header={(res.id) ? 'Edit Patient' : 'Add Patient'}
            >

            <Head title="Patient" />

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="col-span-1">
                    <form onSubmit={handleSubmit}>
                        <div className="mt-2">
                            <InputLabel htmlFor="first_name" value="First Name" />
                            <TextInput
                                id="first_name"
                                type="text"
                                name="first_name"
                                value={data.first_name}
                                className="mt-1 block w-full"
                                isFocused={true}
                                onChange={(e) => setData('first_name', e.target.value)}
                            />
                            <InputError message={errors.first_name} className="mt-2" />
                        </div>

                        <div className="mt-2">
                            <InputLabel htmlFor="last_name" value="Last Name" />
                            <TextInput
                                id="last_name"
                                type="text"
                                name="last_name"
                                value={data.last_name}
                                className="mt-1 block w-full"
                                isFocused={true}
                                onChange={(e) => setData('last_name', e.target.value)}
                            />
                            <InputError message={errors.last_name} className="mt-2" />
                        </div>

                        <div className="mt-2">
                            <InputLabel htmlFor="date_of_birth" value="Date of Birth" />
                            <TextInput
                                id="date_of_birth"
                                type="date"
                                name="date_of_birth"
                                value={data.date_of_birth}
                                className="mt-1 block w-full"
                                isFocused={true}
                                onChange={(e) => setData('date_of_birth', e.target.value)}
                            />
                            <InputError message={errors.date_of_birth} className="mt-2" />
                        </div>

                        <div className="mt-2">
                            <InputLabel htmlFor="gender" value="Gender" />
                            <Select 
                                value={data.gender}
                                options={genders}
                                className="mt-1 block w-full"
                                onChange={(e) => setData('gender', e)} />
                            <InputError message={errors.gender} className="mt-2" />
                        </div>

                        <div className="mt-2">
                            <InputLabel htmlFor="contact_number" value="Contact Number" />
                            <TextInput
                                id="contact_number"
                                type="text"
                                name="contact_number"
                                value={data.contact_number}
                                className="mt-1 block w-full"
                                isFocused={true}
                                onChange={(e) => setData('contact_number', e.target.value)}
                            />
                            <InputError message={errors.contact_number} className="mt-2" />
                        </div>


                        <div className="mt-2">
                            <InputLabel htmlFor="email" value="Email" />
                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="mt-1 block w-full"
                                isFocused={true}
                                onChange={(e) => setData('email', e.target.value)}
                            />
                            <InputError message={errors.email} className="mt-2" />
                        </div>

                        <div className="mt-2">
                            <InputLabel htmlFor="address" value="Address" />
                            <TextInput
                                id="address"
                                type="text"
                                name="address"
                                value={data.address }
                                className="mt-1 block w-full"
                                isFocused={true}
                                onChange={(e) => setData('address', e.target.value)}
                            />
                            <InputError message={errors.address} className="mt-2" />
                        </div>
                        

                        <div className="mt-4">
                            {
                                (res.id) ? (
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <DangerButton className="w-full justify-center" disabled={processing} onClick={(e) => handleDelete(e, res.id)}>
                                                DELETE
                                            </DangerButton>
                                        </div>
                                        <div>
                                            <PrimaryButton className="w-full justify-center" disabled={processing}>
                                                UPDATE
                                            </PrimaryButton>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-1 gap-4">
                                        <div>
                                            <PrimaryButton className="w-full justify-center" disabled={processing}>
                                                SAVE
                                            </PrimaryButton>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    </form>
                </div>
            </div> 
        </AuthenticatedLayout>
    );
}

export default Actions;