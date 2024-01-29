const parseEnv = () => {
    const prefixRegex = /^RSS_/;
    const envVariablesArr = [];
    Object.keys(process.env).forEach((key) => {
        if (prefixRegex.test(key)) {
            const variableName = key.replace(prefixRegex, '');
            const variableValue = process.env[key];
            envVariablesArr.push(`${variableName}=${variableValue}`);
        }
    });
    console.log(envVariablesArr.join('; '));
};

parseEnv();