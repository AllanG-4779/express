export const validNames = (name: string) => {
  const pattern = / [A-Za-z]{3+} /;

  return pattern.test(name);
};

export const strongPassword = (password: string) =>{
   
    /*
    * [A-Z] = at least one uppercase letter
    * [a-z] = at least one lowercase letter
    * [0-9] = at least one digit
    * [!@#$%^&*] = at least one special character
    * {8,} = at least 8 characters
    * 
    */
}
