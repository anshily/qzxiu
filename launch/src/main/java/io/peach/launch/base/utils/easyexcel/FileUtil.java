package io.peach.launch.base.utils.easyexcel;

import java.io.InputStream;

public class FileUtil {
    public static InputStream getResourcesFileInputStream(String fileName) {
        return Thread.currentThread().getContextClassLoader().getResourceAsStream("" + fileName);
    }
}
