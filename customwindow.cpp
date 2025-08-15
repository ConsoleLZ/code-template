#include "customwindow.h"

CustomWindow::CustomWindow(QWidget *parent)
    : QWidget(parent)
{
    // 设置无边框
    setWindowFlags(Qt::FramelessWindowHint);

    // 主布局
    QVBoxLayout *mainLayout = new QVBoxLayout(this);
    mainLayout->setContentsMargins(0, 0, 0, 0);
    mainLayout->setSpacing(0);

    // 添加自定义标题栏
    titleBar = new CustomTitleBar(this);
    mainLayout->addWidget(titleBar);

    // 添加内容区域
    QWidget *contentWidget = new QWidget;
    contentWidget->setStyleSheet("background-color: white;");
    mainLayout->addWidget(contentWidget, 1); // 占据剩余空间

    // 示例内容
    QLabel *contentLabel = new QLabel("主内容区域", contentWidget);
    contentLabel->setAlignment(Qt::AlignCenter);
    QVBoxLayout *contentLayout = new QVBoxLayout(contentWidget);
    contentLayout->addWidget(contentLabel);
}

void CustomWindow::setTitle(const QString &title)
{
    titleBar->setTitle(title);
}
