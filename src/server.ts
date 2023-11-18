import express, {Express} from 'express';

export const app: Express = express();
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server listening at port ${PORT}`);
})
