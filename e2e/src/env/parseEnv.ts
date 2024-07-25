//the purpose of this function we want to say if it passes through evn then we expect an environment varible to be set, 
//otherwise stop the test - if no browsers are defined, we can't run the tests or the browser doesn't exist
export const env = (key: string): string => {
    const value = process.env[key];
    if(!value) {
        throw Error(`No environment variable found for ${key}`)
    }
    return value;
};

export const getJsonFromFile = <T = Record<string, string>>(path: string): T => {
    return require(`${process.cwd()}${path}`) //process.cwd returns the absolute path from where the Node.js process was initiated, not from
    //where the getJsonFromFile function is called, so it will always return the root of the project
}