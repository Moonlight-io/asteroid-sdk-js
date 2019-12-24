export class StringHelper {
  static HexToAscii(hexVal: any): string {
    const hex = hexVal.toString()
    let output = ''
    for (let n = 0; n < hex.length; n += 2) {
      output += String.fromCharCode(parseInt(hex.substr(n, 2), 16))
    }
    return output
  }
}
