export default function buildGmConfig(): {
    dtoName: {
        singular: string;
        plural: string;
    };
    moduleName: string;
    model: {
        dbType: string;
        type: string;
        columns: {
            name: {
                type: string;
            };
            age: {
                type: string;
            };
        };
    };
    hasSeparated: boolean;
    endpoints: {
        add: {
            hasActionLogger: boolean;
            hasAuth: boolean;
            hasStructureAccess: boolean;
        };
        update: {
            hasActionLogger: boolean;
            hasAuth: boolean;
            hasStructureAccess: boolean;
        };
        delete: {
            hasActionLogger: boolean;
            hasAuth: boolean;
            hasStructureAccess: boolean;
        };
        get: {
            hasAuth: boolean;
            hasStructureAccess: boolean;
        };
        list: {
            hasAuth: boolean;
            hasStructureAccess: boolean;
        };
    };
    rootDir: string;
};
