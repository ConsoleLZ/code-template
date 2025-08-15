#ifndef CUSTOMWINDOW_H
#define CUSTOMWINDOW_H

#include <QWidget>
#include <QVBoxLayout>
#include "customtitlebar.h"

class CustomWindow : public QWidget
{
    Q_OBJECT
public:
    explicit CustomWindow(QWidget *parent = nullptr);
    void setTitle(const QString &title);

private:
    CustomTitleBar *titleBar;
};

#endif // CUSTOMWINDOW_H
