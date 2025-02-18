import DataTable from "@/Components/DataTable";
import FlashMessage from "@/Components/FlashMessage";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router, usePage } from "@inertiajs/react";

const Index = ({lists, filters}) => {

    const { flash } = usePage().props;

    const headers = [
        {title: 'FIRST NAME', key: 'first_name'},
        {title: 'LAST NAME', key: 'last_name'},
        {title: 'BIRTHDATE', key: 'date_of_birth'},
        {title: 'GENDER', key: 'gender'},
        {title: 'CONTACT NUMBER', key: 'contact_number'},
        {title: 'EMAIL', key: 'email'},
        {title: 'ADDRESS', key: 'address'},
        {title: 'CREATED AT', key: 'created_at'},
        {title: 'UPDATED AT', key: 'updated_at'},
        {title: 'ACTION', key: 'id'},
    ];

    // Callback function to handle search or filter
    const handleSearchOrFilter = (page, search, perPage) => {
        router.get(route("patients.index"), { page, search, per_page: perPage }, { preserveState: true });
    };

     const handleFunction = {
        onAdd: () => {
            router.get(route("patients.create"));
            
        },
        onView: async (item) => {
            router.get(route("patients.edit", {id: item.id}));
        },
    };

    return (
        <AuthenticatedLayout
            header={'Patients'}
        >
            <Head title="Patient" />

            <div>
                <FlashMessage message={flash.success} type="success" />
            </div>
        
            <DataTable 
                headers={headers} 
                items={lists}
                filters={filters}
                handleSearchOrFilter={handleSearchOrFilter}
                handleFunction={handleFunction} />
                        
        </AuthenticatedLayout>
    );
};

export default Index;