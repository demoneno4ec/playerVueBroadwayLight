export const toUint8Array = function (parStr) {
    let raw = window.atob(parStr),
        rawLength = raw.length,
        array = new Uint8Array(new ArrayBuffer(rawLength));

    for (let i = 0; i < rawLength; i++) {
        array[i] = raw.charCodeAt(i);
    }

    return array;
}