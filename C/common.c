void minmax(int a[], int len, int *max, int *min) {
	*min = *max = a[0];
	for (int i = 0; i < len; i++)
	{
		/* code */
		if (a[i] < *min) {
			*min = a[i];
		}
		if (a[i] > *max) {
			*max = a[i];
		}
	}
}

int search(int key, int a[], int len) {
	int ret   = -1;
	int left  = 0;
	int right = len - 1;
	while(left < right) {
		int idx = (left + right) / 2;
		if (a[idx] == key) {
			ret = idx;
			break;
		} else if (a[idx] > key) {
			right = idx - 1;
		} else {
			left = idx + 1;
		}
	}
	return ret;
}

int max(int a[], int len) {
	int maxIndex = 0;
	for (int i = 0; i < len; i++)
	{
		if (a[i] > a[maxIndex]) {
			maxIndex = i;
		}
	}
	return maxIndex;
}

/* 选择排序 */
void sort(int a[], int len) {
	for (int i = len - 1; i > 0; i--)
	{
		int maxIndex = max(a, i + 1);
		int temp	 = a[maxIndex];
		a[maxIndex]  = a[i];
		a[i] 		 = temp;
	}
}

int mystrlen(const char s[]) {
	int count = 0;
	while(s[count] != '\0') {
		count++;
	}
	return count;
}

int mystrcmp(const char s1[], const char s2[]) {
	int idx = 0;
	while(s1[idx] == s2[idx] && s1[idx] != '\0') {
		idx++;
	}
	return s1[idx] - s2[idx];
}

char* mystrcpy(char *dist, const char *src) {
	int idx = 0;
	while(src[idx] != '\0') {
		dist[idx] = src[idx];
		idx++;
	}
	dist[idx] = '\0';
	return dist;
}