import { getConnectionOptions, createConnection } from "typeorm";

export default {
    init: async () => {
        const options = await getConnectionOptions(
            process.env.NODE_ENV || "development"
        );
        await createConnection({ ...options, name: "default" });
    },
};