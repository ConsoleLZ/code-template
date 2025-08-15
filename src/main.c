#include <stm32f10x.h>
#include "usart.h"

uint8_t str[] = "Debugging";
uint8_t buffer[100] = {0};
uint8_t len = 0;

int main(void){
    USART_Init1();

    USART_Send_String(str, sizeof(str) / sizeof(str[0]) - 1);
    while(1);
}