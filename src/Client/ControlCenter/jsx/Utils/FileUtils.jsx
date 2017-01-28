export default class FileUtils {
    static GenerateDownload(filename, content, datatype) {
        if(!datatype) {
            datatype = 'text/plain;charset=utf-8';
        }

        var pom = document.createElement('a');
        pom.setAttribute('href', 'data:' + datatype + ',' + encodeURIComponent(content));
        pom.setAttribute('download', filename);

        if (document.createEvent) {
            var event = document.createEvent('MouseEvents');
            event.initEvent('click', true, true);
            pom.dispatchEvent(event);
        }
        else {
            pom.click();
        }
    }

    static GetFile() {
        return new Promise((resolve, reject) => {
            var callback = function (event) {
                var file = event.target.files[0];
                if (!file) {
                    reject();
                } else {
                    var reader = new FileReader();
                    reader.onload = function (event) {
                        var fileData = event.target.result;
                        var bytes = new Uint8Array(fileData);
                        var binaryText = '';

                        for (var index = 0; index < bytes.byteLength; index++) {
                            binaryText += String.fromCharCode( bytes[index] );
                        }

                        resolve({
                            filename: file.name,
                            content: btoa(binaryText)
                        });
                    };
                    reader.readAsArrayBuffer(file);
                }
            }

            var pom = document.createElement('input');
            pom.setAttribute('type', 'file');
            pom.addEventListener('change', callback, false);

            if (document.createEvent) {
                var event = document.createEvent('MouseEvents');
                event.initEvent('click', true, true);
                pom.dispatchEvent(event);
            }
            else {
                pom.click();
            }
        });
    }
}