export namespace SslHelper {
  export function getDate(from: string, to: string): string {
    if (from) {
      return `${new Date(from).toLocaleDateString()} - ${new Date(
        to
      ).toLocaleDateString()}`;
    } else {
      return 'could not get dates';
    }
  }

  export function getValidForList(validFor: string[]): string[] {
    return validFor.slice(0, validFor?.length > 2 ? 2 : validFor?.length);
  }

  export function moreThanTwo(validFor: string[]): boolean {
    return validFor?.length > 2;
  }
}
