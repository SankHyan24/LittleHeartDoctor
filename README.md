Current work

input.py: 
Read the ECG signal from AD8232, 
Do signal preprocessing,
Store it in ECG.mat,
Visualize the signal

ECG.mat:
Input voltage sequence of the ECG signal

output.py:
Use the pretrained model to predict the category of ECG;
Store the prediction result in result.txt

result.txt:

[0.24511309 0.25339636 0.24923614 0.2522544 ]
From left to right, indicate the probability of A(心律失常), N(正常心率), O(不正常 替代节律), ~(NOISE)
Apparently, since no input, the current probability is average for 4 categories.

WIP：

1. Check whether the code can be run on RK3399
(HBT: Waiting for the keyboard, plan to be done next week)

2. Check whether the result is trustworthy
(HBT: Waiting for input patch, plan to be done next week)

3. Data visualization based on result.txt and ECG.mat
(SC)

How to run the code:

Simulatenously run input.py and output.py.

