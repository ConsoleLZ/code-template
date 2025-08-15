#include "customtitlebar.h"
#include <QtGlobal> // 用于 QT_VERSION 宏

CustomTitleBar::CustomTitleBar(QWidget *parent)
    : QWidget(parent), parentWidget(parent)
{
    setupUI();
}

void CustomTitleBar::setTitle(const QString &title)
{
    titleLabel->setText(title);
}

void CustomTitleBar::setupUI()
{
    setFixedHeight(40);  // 标题栏高度
    setStyleSheet("color: black;");  // 标题栏样式

    QHBoxLayout *layout = new QHBoxLayout(this);
    layout->setContentsMargins(10, 0, 5, 0);

    // 标题文本
    titleLabel = new QLabel("自定义窗口标题");
    titleLabel->setStyleSheet("font-weight: bold;");
    layout->addWidget(titleLabel);

    // 弹簧
    layout->addStretch();

    // 最小化按钮
    QPushButton *minButton = new QPushButton;
    minButton->setIcon(style()->standardIcon(QStyle::SP_TitleBarMinButton));
    minButton->setFlat(true);
    minButton->setFixedSize(40, 40);
    minButton->setStyleSheet(
        "QPushButton { background-color: transparent; border: none; }"
        "QPushButton:hover { background-color: #c1c1c1; }"
    );
    connect(minButton, &QPushButton::clicked, this, &CustomTitleBar::minimizeWindow);

    // 关闭按钮
    QPushButton *closeButton = new QPushButton;
    closeButton->setIcon(style()->standardIcon(QStyle::SP_TitleBarCloseButton));
    closeButton->setFlat(true);
    closeButton->setFixedSize(40, 40);
    closeButton->setStyleSheet(
        "QPushButton { background-color: transparent; border: none; }"
        "QPushButton:hover { background-color: #f76c6c; }"
    );
    connect(closeButton, &QPushButton::clicked, this, &CustomTitleBar::closeWindow);

    layout->addWidget(minButton);
    layout->addWidget(closeButton);
}

void CustomTitleBar::mousePressEvent(QMouseEvent *event)
{
    if (event->button() == Qt::LeftButton) {
        #if QT_VERSION >= QT_VERSION_CHECK(6, 0, 0)
            QPoint globalPos = event->globalPosition().toPoint();
        #else
            QPoint globalPos = event->globalPos();
        #endif

        dragPosition = globalPos - parentWidget->frameGeometry().topLeft();
        event->accept();
    }
}

void CustomTitleBar::mouseMoveEvent(QMouseEvent *event)
{
    if (event->buttons() & Qt::LeftButton) {
        // 兼容 Qt 5 和 Qt 6 的全局坐标获取
        #if QT_VERSION >= QT_VERSION_CHECK(6, 0, 0)
            QPoint globalPos = event->globalPosition().toPoint();
        #else
            QPoint globalPos = event->globalPos();
        #endif

        parentWidget->move(globalPos - dragPosition);
        event->accept();
    }
}

void CustomTitleBar::minimizeWindow()
{
    parentWidget->showMinimized();
}

void CustomTitleBar::closeWindow()
{
    parentWidget->close();
}
