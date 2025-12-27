import Heading from '@/components/heading';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type City } from '@/types';
import { Head } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Trash2, Edit2, Plus } from 'lucide-react';
import { useState, useMemo, useCallback } from 'react';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { useForm } from '@inertiajs/react';
import { AgGridTable } from '@/components/ag-grid-table';
import { ThemeSwitcher } from '@/components/theme-switcher';
import { CityModal } from '@/components/city-modal';
import { ICellRendererParams, type ColDef } from 'ag-grid-community';


interface Props {
    cities: City[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/',
    },
    {
        title: 'Cities',
        href: '/cities',
    },
];

export default function CitiesIndex({ cities }: Props) {
    const [deleteId, setDeleteId] = useState<number | null>(null);
    const [cityModalOpen, setCityModalOpen] = useState(false);
    const [editingCity, setEditingCity] = useState<City | undefined>();
    const { delete: deleteCity } = useForm();

    const handleDelete = (id: number) => {
        deleteCity(`/cities/${id}`, {
            onSuccess: () => setDeleteId(null),
        });
    };

    const handleEditClick = (city: City) => {
        setEditingCity(city);
        setCityModalOpen(true);
    };

    const handleAddClick = () => {
        setEditingCity(undefined);
        setCityModalOpen(true);
    };

    const handleModalClose = () => {
        setCityModalOpen(false);
        setEditingCity(undefined);
    };

    const ActionsCellRenderer = useCallback(
        (props: ICellRendererParams<City>) => {
            const city = props.data;
            return (
                city && (
                    <div className="flex gap-2 h-full items-center">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEditClick(city)}
                        >
                            <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setDeleteId(city.id)}
                            className="text-destructive hover:text-destructive"
                        >
                            <Trash2 className="w-4 h-4" />
                        </Button>
                    </div>
                )
            );
        },
        []
    );

    const columnDefs: ColDef[] = useMemo(
        () => [
            {
                field: 'name',
                headerName: 'City Name',
                flex: 1,
                minWidth: 200,
                cellDataType: 'text',
            },
            {
                field: 'created_at',
                headerName: 'Created Date',
                flex: 1,
                minWidth: 180,
                cellRenderer: (props: ICellRendererParams<City>) => {
                    const date = new Date(props.value);
                    return date.toLocaleDateString();
                },
            },
            {
                field: 'actions',
                headerName: 'Actions',
                flex: 0.8,
                minWidth: 140,
                sortable: false,
                filter: false,
                cellRenderer: ActionsCellRenderer,
            },
        ],
        [ActionsCellRenderer]
    );

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Cities" />
            <div className="flex flex-col gap-4 p-4 h-full">
                <div className="flex items-center justify-between">
                    <Heading title="Cities" />
                    <div className="flex items-center gap-2">
                        <ThemeSwitcher size="sm" />
                        <Button onClick={handleAddClick} className="gap-2">
                            <Plus className="w-4 h-4" />
                            Add City
                        </Button>
                    </div>
                </div>

                <AgGridTable
                    rowData={cities}
                    columnDefs={columnDefs}
                    height="500px"
                    noRowsTemplate="No cities found"
                />

                <CityModal
                    open={cityModalOpen}
                    onOpenChange={handleModalClose}
                    city={editingCity}
                />

                <Dialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Delete City</DialogTitle>
                            <DialogDescription>
                                Are you sure you want to delete this city? This action cannot be undone.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="flex gap-2 justify-end">
                            <DialogClose asChild>
                                <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button
                                variant="destructive"
                                onClick={() => deleteId && handleDelete(deleteId)}
                            >
                                Delete
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        </AppLayout>
    );
}
