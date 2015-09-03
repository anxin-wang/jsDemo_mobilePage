#!/bin/tcsh

# jquery.plugin-min.js
java -jar compiler.jar --js=../custom/common.js --js=../custom/jquery.plugin.js  --js_output_file=../common-min.js
if (-r ../common-min.js) then
    echo "common-min.js is finished"
else
    echo "compress faild"; exit 1
endif


# common-min.js
#java -jar compiler.jar --js=../plugins/jquery.min.js --js=../plugins/artDialog.min.js --js=../plugins/jquery.validate.min.js --js=../profiles/uas.js --js=../mod.dev/register.js --js_output_file=../edr.register-min.js
#if (-r ../edr.register-min.js) then
#    echo ".js is finished"
#else
#    echo "compress faild"; exit 1
#endif




echo "All finished"
exit 0