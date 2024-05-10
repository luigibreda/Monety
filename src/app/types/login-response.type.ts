export type LoginResponse = {
    token: string;
    name: string;
    email: string;
    isAdmin: boolean;
    ativo: boolean;
    userId: string;
    createdAt: string;
    updatedAt: string;
}