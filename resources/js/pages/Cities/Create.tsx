import Heading from '@/components/heading';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import InputError from '@/components/input-error';
import { FormEventHandler } from 'react';

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
        title: 'Create',
        href: '/cities/create',
    },
];

export default function CreateCity() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
    });

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        post('/cities');
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create City" />
            <div className="flex flex-col gap-4 p-4 max-w-2xl">
                <Heading title="Create City" />

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
                                {processing ? 'Creating...' : 'Create City'}
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
