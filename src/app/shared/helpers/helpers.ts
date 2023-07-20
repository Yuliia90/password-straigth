export function checkStrength(password: string):number {

  let force:number = 0;

  const regex: RegExp = /[$-/:-?{-~!"^_@`\[\]]/g;
  const lowerLetters: boolean = /[a-z]+/.test(password);
  const upperLetters: boolean = /[A-Z]+/.test(password);
  const numbers: boolean = /[0-9]+/.test(password);
  const symbols: boolean = regex.test(password);


  const flags:boolean[] = [lowerLetters, upperLetters, numbers, symbols];
  const isValid: boolean = flags.every((flag) => flag);

  let passedMatches:number = 0;
  for (const flag of flags) {
    passedMatches += flag ? 1 : 0;
  }

  const errorIndex:number = flags.findIndex((flag: boolean, index: number): void | number => {
    if(!flag) {
      return index
    }
  })

  force += passedMatches * 10;


  force = password.length <= 8 ? Math.min(force, 10) : force;

  const errorConstant: number = (errorIndex + 1) * 10


  if(errorIndex !== -1 && errorConstant) {
    force = errorIndex === 1 ? Math.min(force, 10) : force;
    force = errorIndex === 2 ? Math.min(force, 20) : force;
    force = errorIndex === 3 ? Math.min(force, 30) : force;
    force = errorIndex === 4 ? Math.min(force, 40) : force;
  }

  return isValid ? 40 : force;
}
