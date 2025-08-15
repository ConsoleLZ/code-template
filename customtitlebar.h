#ifndef CUSTOMTITLEBAR_H
#define CUSTOMTITLEBAR_H

#include <QWidget>
#include <QHBoxLayout>
#include <QLabel>
#include <QPushButton>
#include <QPoint>
#include <QMouseEvent>
#include <QStyle>

class CustomTitleBar : public QWidget
{
    Q_OBJECT
public:
    explicit CustomTitleBar(QWidget *parent = nullptr);

    void setTitle(const QString &title);

protected:
    void mousePressEvent(QMouseEvent *event) override;
    void mouseMoveEvent(QMouseEvent *event) override;

private slots:
    void minimizeWindow();
    void closeWindow();

private:
    void setupUI();

    QWidget *parentWidget;
    QLabel *titleLabel;
    QPoint dragPosition;
};

#endif // CUSTOMTITLEBAR_H
