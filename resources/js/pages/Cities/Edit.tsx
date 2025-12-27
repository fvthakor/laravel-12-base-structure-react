import Heading from '@/components/heading';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type City } from '@/types';
import { Head, useForm, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import InputError from '@/components/input-error';
import { FormEventHandler } from 'react';

interface Props {
    city: City;
}

export default function EditCity({ city }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Dashboard',
            href: '/',
        },
        {
            title: 'Cities',
            href: '/cities',
        },
        {
            title: 'Edit',
            href: `/cities/${city.id}/edit`,
        },
    ];

    const { data, setData, patch, processing, errors } = useForm({
        name: city.name,
    });

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        patch(`/cities/${city.id}`);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit City - ${city.name}`} />
            <div className="flex flex-col gap-4 p-4 max-w-2xl">
                <Heading title="Edit City" />

                <div className="rounded-lg border border-sidebar-border/70 p-6 dark:border-sidebar-border">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium mb-2">City Name</label>
                            <Input
                                type="text"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                placeholder="Enter city name"
                                className={errors.name ? 'border-destructive' : ''}
                            />
                            {errors.name && <InputError message={errors.name} />}
                        </div>

                        <div className="flex gap-2">
                            <Button type="submit" disabled={processing}>
                                {processing ? 'Updating...' : 'Update City'}
                            </Button>
                            <Link href="/cities">
                                <Button type="button" variant="outline">
                                    Cancel
                                </Button>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
