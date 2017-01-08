export default class FileUtils {
    static GenerateDownload(filename, content) {
        var pom = document.createElement('a');
        pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
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
                        var contents = event.target.result;

                        resolve(contents);
                    };
                    reader.readAsText(file);
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