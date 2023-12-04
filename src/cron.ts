import * as cron from 'node-cron';


/**
 * Adds new job to cronTab.
 * @param time minutes count.
 * @param repeat repeat job every 'time' or not.
 * @param job job which need to do.
 */
export const addJob = async (time: number, repeat: boolean, job: Function) => {
    const task = cron.schedule(`*/${time} * * * *`, async () => {
        job();
        task.stop();
    }, { scheduled: repeat });
};