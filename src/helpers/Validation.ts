class ValidationHelper {
  validate = (fields: any, rules: any) => {
    /*
     @ fields and rules are object 
  */
    const errors = [];
    let emailRegx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    let minRegx = /min/g;
    let maxRegx = /max/g;

    for (const ruleProp in rules) {
      switch (true) {
        // Undefined validation
        case fields[ruleProp] === undefined:
          errors.push(`${ruleProp} is not declare`);
          break;
        case fields.hasOwnProperty(ruleProp):
          rules[ruleProp].split("|").forEach((item: any) => {
            switch (true) {
              case item === "required" && !fields[ruleProp]:
                errors.push(`${ruleProp} is required`);
                break;
              case item === "string" && typeof fields[ruleProp] !== "string":
                errors.push(`${ruleProp} should be string`);
                break;
              case item === "number" && typeof fields[ruleProp] !== "number":
                errors.push(`${ruleProp} should be number`);
                break;
              case item === "email" &&
                emailRegx.test(fields[ruleProp]) === false:
                errors.push(`${ruleProp} is invalid`);
                break;
              case item === "matchPassword":
                // Password validation like fields name can be confirm_passwod, newPassword etc.
                let arr = Object.keys(fields).filter((item) =>
                  /password/gi.test(item)
                );
                // console.log(arr)
                if (fields[arr[0]] !== fields[arr[1]])
                  errors.push(`Password doesn't match`);
                break;
              // case item === "matchPassword" &&
              //   fields.password !== fields.confirm_password:
              //   errors.push(`Password doesn't match`);
              //   break;
              case minRegx.test(item): {
                const charLength = item.split(":")[1];
                if (fields[ruleProp].toString().length < charLength)
                  errors.push(
                    `${ruleProp} length should be greater than ${charLength}`
                  );
                break;
              }
              case maxRegx.test(item): {
                const charLength = item.split(":")[1];
                if (fields[ruleProp].toString().length > charLength)
                  errors.push(
                    `${ruleProp} length should not be larger than ${charLength}`
                  );
                break;
              }

              default:
                break;
            }
          });
          break;

        default:
          break;
      }
    }

    // return { errors };
    return errors.length ? Promise.reject({ message: errors }) : "";

    return errors;
  };
}

export default new ValidationHelper();
