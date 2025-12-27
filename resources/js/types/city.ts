export interface City {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
}

export interface CityFormValues {
    name: string;
}

export interface CityModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    city?: City;
    onSuccess?: () => void;
}
