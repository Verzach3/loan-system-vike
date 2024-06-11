



//TODO: Implement onShowReportsById
export const onShowReportsById = async (id: string) => {
    

    if (!id) {
        return {
            error: true,
            message: 'id is required'
        }
    }

    await db


};