
export enum Role {
    CUSTOMER = "CUSTOMER",
    SELLER = "SELLER",
    ADMIN = "ADMIN",
}

export enum UserStatus {
    BAN="BAN",
    UNBAN="UNBANE"

}


export interface User {
    id: string;
    name: string;
    email: string;
    emailVerified: boolean;
    image: string | null;
    phone: string | null;
    role: Role;
    status: UserStatus;
    createdAt: string;
    updatedAt: string;
}