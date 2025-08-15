#include <QApplication>
#include "customwindow.h"

int main(int argc, char *argv[])
{
    QApplication a(argc, argv);

    CustomWindow w;
    w.setTitle("自定义窗口");
    w.showFullScreen();
    w.show();

    return a.exec();
}
