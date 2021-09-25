interface StringValidator {
  isAcceptable(s: string): boolean;
}

const lettersRegexp = /^[A-Za-z]+$/;
const numberRegexp = /^[0-9]+$/;

class LetterOnlyValidator implements StringValidator {
  isAcceptable(s: string): boolean {
    return false;
  }

}
