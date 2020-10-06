import application from "./application";

const PORT = process.env.PORT || 3000;
application.listen(PORT, () =>
    console.log(`Server is running at PORT:${PORT}`)
);