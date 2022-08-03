export interface Book{
    id: number,
    name: string,
    authorId: number,
    isbn: string,
    description: string,
    isActive: boolean,
    createdBy: number,
    category: number[],
}