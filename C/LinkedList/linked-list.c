#include "node.h"
#include <stdio.h>
#include <stdlib.h>

int main(int argc, char const *argv[])
{
	Node *head = NULL;
	int n;
	do {
		scanf("%d", &n);
		if (n !- -1) {
			Node *p = (Node*)malloc(sizeof(Node));
			p -> value = n;
			p -> next  = NULL;

			Node *last = head;
			if (last) {
				while(last -> next) {
					last = last -> next;
				}
				last -> next = p;
			} else {
				head = p;
			}
		}
	} while(n != -1);

	return 0;
}