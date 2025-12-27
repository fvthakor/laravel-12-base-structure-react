import Heading from '@/components/heading';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type City } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

interface Props {
    city: City;
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

export default function ShowCity({ city }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={city.name} />
            <div className="flex flex-col gap-4 p-4 max-w-2xl">
                <div className="flex items-center gap-2">
                    <Link href="/cities">
                        <Button variant="ghost" size="sm">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back
                        </Button>
                    </Link>
                </div>

                <Heading title={city.name} />

                <div className="rounded-lg border border-sidebar-border/70 p-6 space-y-4 dark:border-sidebar-border">
                    <div>
                        <h3 className="text-sm font-medium text-muted-foreground">ID</h3>
                        <p className="text-lg">{city.id}</p>
                    </div>
                    <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Name</h3>
                        <p className="text-lg">{city.name}</p>
                    </div>
                    <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Created</h3>
                        <p className="text-lg">{new Date(city.created_at).toLocaleDateString()}</p>
                    </div>

                    <div className="flex gap-2 pt-4">
                        <Link href={`/cities/${city.id}/edit`}>
                            <Button>Edit</Button>
                        </Link>
                        <Link href="/cities">
                            <Button variant="outline">Back to List</Button>
                        </Link>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
