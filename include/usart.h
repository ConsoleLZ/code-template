#ifndef USART_H
#define USART_H
#include <stm32f10x.h>

extern uint8_t buffer[100];
extern uint8_t len;

// 串口初始化
void USART_Init1();

// 发送一个字节
void USART_Send_Byte(uint8_t byte);

// 发送字符串
void USART_Send_String(uint8_t *str, uint8_t len);

#endif