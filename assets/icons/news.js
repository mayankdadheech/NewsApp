import * as React from 'react';
import Svg, {
  G,
  Path,
  Defs,
  Pattern,
  Use,
  ClipPath,
  Image,
} from 'react-native-svg';

function News(props) {
  return (
    <Svg
      width={20}
      height={20}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      {...props}>
      <G clipPath="url(#clip0_1_21)">
        <Path fill="#D32000" d="M0 0H20V20H0z" />
        <Path fill="url(#pattern0_1_21)" d="M0 0H20V20H0z" />
      </G>
      <Defs>
        <Pattern
          id="pattern0_1_21"
          patternContentUnits="objectBoundingBox"
          width={1}
          height={1}>
          <Use xlinkHref="#image0_1_21" transform="scale(.00444)" />
        </Pattern>
        <ClipPath id="clip0_1_21">
          <Path fill="#fff" d="M0 0H20V20H0z" />
        </ClipPath>
        <Image
          id="image0_1_21"
          width={225}
          height={225}
          xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAIAAACx0UUtAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAA4aADAAQAAAABAAAA4QAAAAAYn8bHAAAVuElEQVR4Ae2daYwUVduGX18VREVcwJWgIiJxwBgVfJUYcAGJCxkVNYD+cAmaoAaNiWtU1MRo/DTuQTFiXBCDuKOIGxjEJW6IuOs4IoIii6gMbvkuKHJOd3VV9enu6uozU/f8mJyqOlX11PXcffZlk6ampv/oTwS8JNDW1tbc3PxfL22TUSJgCUijloVCfhKQRv30i6yyBKRRy0IhPwlIo376RVZZAtKoZaGQnwSkUT/9IqssAWnUslDITwLSqJ9+kVWWgDRqWSjkJwFp1E+/yCpLQBq1LBTyk4A06qdfZJUlII1aFgr5SUAa9dMvssoSkEYtC4X8JCCN+ukXWWUJSKOWhUJ+EpBG/fSLrLIEpFHLQiE/CUijfvpFVlkC0qhloZCfBKRRP/0iqywBadSyUMhPAtKon36RVZaANGpZKOQnAWnUT7/IKktAGrUsFPKTgDTqp19klSUgjVoWCvlJQBr10y+yyhKQRi0LhfwkII366RdZZQlIo5aFQn4SkEb99IussgSkUctCIT8JSKN++kVWWQLSqGWhkJ8EpFE//SKrLAFp1LJQyE8C0qiffpFVloA0alko5CcBadRPv8gqS0AatSwU8pOANOqnX2SVJSCNWhYK+UlAGvXTL7LKEpBGLQuF/CQgjfrpF1llCUijloVCfhKQRv30i6yyBKRRy0IhPwlIo376RVZZAtKoZaGQnwSkUT/9IqssAWnUslDITwLSqJ9+kVWWwGY2WLfQX3/9tXLlyro9PuLBm266KWf5v9mGPwKbb755RLz6nFq1atWff/5Zn2d78dRtttlmiy22yMyUumsUgQ4aNOjMM8/M0m2//fbbP//8s3z58tWrV//8889ffPFFS0vLjz/+2NbWttVWW2255ZadO3euk2oR6MSJE3v27JmZCzN+UadOnZ588smZM2dmJtO6axSCa9euPfzwwzNGWfo6BPr9999/8803ixYteuWVV55//vntt9++a9euW2+9dWnkqs/88MMPY8eOzcx/VdtZy40wnDFjRmbfuElTU1Mt5rrcSwL2yy+/uMTMMg6S/fDDD1977bUpU6aQ4m633XapQOexX331VZYfkv27Zs2adfrpp++44471fjUwm5ubs0hHu3fvPnz48H79+u2555677bZbjx49yApJw3bYYYcqPhK7Q3dVpy3u+t+Gv8suu+ytt96aPHny/fffv9dee1X3tMAkCjb7779/yLzqDimuBL9tciHzhN69e+++++7mMCHAb6/wapcuXaBdNfPCRxEmu6coFTpZv8MsNErJ77vvviOD+Pvvv9etW0fBFJ398ccffNWxxx575JFHDhs2rH///o4fCe64mOQJ/BL4z9++++7r/sxArNddd93/bfjr27dvdaVVPLfHHnvEmVf2/Jdffjl37tz58+dT4FuxYgXl5uAHE1QBKVhPmzbNUaNHHHEEigxuDPRkmA8ZMuToo48+4IADDjrooOqSCVKZ0pSi7NdVHSGLvD7BOBIeVIuCcQxCSYhpLpEGb7vttuYwFAgeyDN//fVXqp8nn3zyCSecUFFpGGPOP//8efPm7bLLLqGHlz0MKkxnnXVW2ZiFEUgyEd+kSZM++eSToMgRmZZTXrrttttOOeWUwnvjwogvzv4AEWnE77//fuKJJ1KdrYgPbySB79OnD7li3NvTOs8vgby+we2jJFdUWXbeeefW1tZUPix4IB6CIP+pfh533HH77LPPE0884fh8EqpnnnnmnnvuQTG40/GuIBpZBNmx+y2o84YbbqDedvXVV9MEgc38/CIF6v7MsjEDRJQmeR1Jw6hRo8hwKGKWvdFEwOAgGzRn6hposEbNtwW5kjlMK4C/g5/7uHHjhg4dShrp+GSSK1qsSGkqkinxyQcdX/H444/zeyD5pGSCNKsrXTi+Ky4afEhu+UYSVH7MJJBxMQvPp9sSUvjkyLAvGo00Lq2TuB9P4AAKi+4Jxt577/3RRx9xb0UyjcthC7+F5JN68RlnnEHkjP1daIYJ8438kikN77rrro58qPua2+sdyIVGA4h4ghRrxIgRJGCOWCktzJkzh6KtY3wSUW5JjkxaTt5KJhsk8MmRs7xq+Nx9991l30t5tKKfbtkHJkTIkUYDCsj01FNPDTXNJABCc7Nnz6ZsmhAnuITPaBBIjrZw4ULScnq56l3oTDYj4Sp8xo8fX1amaDSz5qfcaRT34AaaZty7FUj2aD396aefElzLJXy23377JcRBoAMGDODtpFgJ0Rp+KZBpcm6T0LSSuv151CgQaaufMGGCO02ak8rmbjSUJFTqKQ3TMIn73V/awJjYSW5DCTXOBsqjtHbHXU33fE41Slb78MMPv/vuu+40aZtcvHhxQnwanpB+ZATkSz8F/W2RV/08SbmFmn5cWz0apRE6G8tzqlHgoqcbb7zRnfLAgQMHDx6cUFGg4SmutnveeedRl/c8iw+hwFpUSPNt6Hxw2K1bN5VHI8mkeZKklIZ9xxbB4MXnnHNOQh2fZu3IhifeMnXqVB/amCrFh83XXnstxejSG+lolUZLsaR/hmSPjij359LNvXTp0rj4kQ1P1MzoPvCtmSnuE0rPk+NfeumlpeepM8UVA0oj13gmv3k94BjvzOgNd4KkK8cff3xkds/JyBFPl1xyCV3w7q/wLSY5Pu10pU11WWYLudYoDmCkc0XpAVWfyLoCGR9DrkIKI5dkvJ+3TaEha+MOGcTDzILQ1Sx/eLnWKNwZ/1bRkGTaSiOHU9AQQ99pyJHkkmVb9UO3eHjIL5kGEIbYFtrGDy+y8F0YJ61w3jXK+L3PP//cnSaFTurvpfFJXOnsLjwfZJE4uPBkOw0jx7vuuitkPNWmyGJPKFrth3nXKN2SS5YscecY1x1P42ivXr0Kn8No6Q4z8y5oTg6NGstgrkjAM+8ahQKTmQq1lRxm6GRkBAq1hYokcyQd7RiJaPC9DCN89NFHC7+dTrVsmp/yrlHm3zOTsxB9deFQ+YxRoZkV16ozuNK7qMjzUYV3UW3Kpjs07xplbDUTPArRlw2X1pkolhX2gtIv0AGq86Uc1qxZU9gItdNOO0mjpZTqcoaipPtz8RNNAaH4ZHmFI57eeOMNZr+E4nSAQxJOmurMhzD8QHm9oeFRgH6j0vZOkpPCdPSll16id8Ajo1MyhQ9/6qmnzMNo4pBGDY06BqDM8Aj3F1B4LZ16RcNToUaZsleqY/dX+Bzz66+/NiMcKKFKoxk5i3KV+5vef//90ry+sOGJvqXIBlT3V/gck7RzwYIFgYW0PVXURVf1d+W9zkQ2HTegLpIpU9JoUg1dwlWmFv/2229n2U8YsqTeh/w+33zzzeAtmXXZ512jZNOhtvcEN1MYZQpeZKunWT7khRde6JCF0QALv08+MAjTnVHaxJFAr+pLedco40FZIcIRH6vtRVbYmVnBEGb+EDEujBSx4ys8j8anMf2QDic+ltwjkkbqn5DFek+pG53uAxkm4vhAZkvSv18ameTEFGrb71DR0u+KPMMHslZUUBLN5mNzrVFAjx49OtITpSfp3uQvzitx50uf0wHOmMJ3Nt+S67yejJ5FyxxBX3HFFYU98o53KVrtBHKtURqJmE/sApHq/HvvvdeBC5ouEBoVJ78apdR/5ZVXujS2UxNieaaMM7hGCcLD9+ZXo1ROWWfUxSUsHhZZVXK5V3FqJ5BTjbIwDsvjuLRCX3zxxfQtuSS3tTtDT4gkkEeNUp1nJXKX1ZZZAeGBBx7Icm2jSCfl/GTu2p4Y60lVyWVZZ1JQBKpiaMN/IfnSKAJldWb+4qYlBf4goT3ttNOqWxK/4R7teAbkKK9HefTOI9DSScaFfmWSLkvksXVTso4Lb1G4rgTyolFGPbKOCAPnEgRKG9MFF1zAXjwUQFVJqqvsKnp4B8/rydyDVcTuvffek046KQ4NbaX33XcfzaWUPnPVqxkHxKvzHVOjQcWIzZ4ZkcTOYAl7GtFKypTc66+/ntG7UqdX0jTGtD+NMluDce+lEzaYt8AfhU5GIbFyGAszsTVW3JgmsvXXX3/9wQcffPbZZxn6KXUaQXgYaH8anT59eiRHGuRZ3YUJDGa4cSga8mVpJ8bJs1Ye8xsZ+0jvUXtZ/Dv0Lbk6bH8aTShWxnnu1ltvffrppxlCH0QgW2eKnGpFcbh8O9/+NFoFwQs3/JGOLlu2jK11P/30U0aCspwBu8Qy94ipHRrQVAXVzG5p3xpFdkyao9Uz4MVsm4QueBJOigH8mS1cg32OH3roIZJYzifcm5k/9KJSAu1Po2effTbFSv7MOk1MViyc/EURky2cmc/AH22iCXk6baX80XFP6ynFXHYOoaGKlFXJaqlQGnim/WmUGg+ruNDMzl8cOOrsL7744tq1a4kwduzYMWPGJG88TrMo4/T4ox+fzUZaWloyW7gw7hN03hBof/1MXbp0KZvOkXaiYJTHH7sy0HV06KGHFq6nZb4/FKBC9s4779x5550M3qNhP3RVhw0h0P40Wikm9ErzJw2i7Ig1cuTI0EKvkU+jzb+1tZXI3377bWQEncySQMfXaECTpBelsqw4W8om74QZxEfZt99++4wZM5ApvVZZukTvChHIi0aDz0ap1KiY+8HY0BCIyEM2ZFq0aBF30YAQGUEnMyCQL40GQElQH3nkEdoHXPjSJsVovczW33IxKW9x8qhRfMzYULpDHWVKu+mrr75KR6tS04b8PHKq0UCmNGPRTerCneIpMiWmyqYuuNKNk1+NwpGWqYsuusilTYrIpKasN8Yw/nQdoKeVJZBrjUKHKhTrOzhm4nRKTZs2zSxkXBauIqRCIO8aBSLb38Tt0l6KmKZTuvsdNV16u85UQUAaXZ+Js0u7S9t+wPeOO+5gWfgqWOuW6ghIo+u5MZyUrRMdCVKKveqqq9RT6oir9mjS6HqGVNtJHekvdQTK9FH3dNfxmYoWR0Aa3UiGnRuoD8VhCp2neZVBUiqVhrDU6VAa3QiW0fgsJe5OmdYAVfDdcdUSUxrdSI9O+WA3AkeaAwcOpGDqGFnRaiEgjVp6ZPcvv/yyPS4XYvS0ak7lIKVwXRq1EKk5zZ8/3x6XCzFuunCOSrnoul4lAWnUgkOjbJlsj8uF2Gu5A2+7WO7rs7sujRaxpjvevQWK8mgH3tKuiEtDD6TRIvxMMa2ots560BoJVUSwDgfSaBFU0kUzJbroQswB2T2LTMVc1Ol0CEijRRxZ6mz16tVFpxIPmIzPIhSJUXSxVgLSaBFBNLpmzZqiU4kHVLMSr+tiCgSk0SKIjNML1tQtOht/II3Gs0ntijRaE0p12deEz+1maTTMiaQ0fCr+WBqNZ5PaFWm0CCUVIJqfik4lHtAIUJGmEx+mi9EEpNEiLqxinrDUWVHUDQesEFG66nlpNJ2phYA0WkSPxs5evXoVnUo8YHEeBkwlRtHFWglIo0UEV6xY0bt376JT8QcMxVd5NB5Palek0SKUffv2dd/e7rPPPlN/fRG++hxIo5YrieJhhx1mj8uFZs+erX3ty0FK4bo0aiEy0G748OH2uFzoscceUxt+OUgpXJdGLcSlS5ey4rM9TgyxmF6wlnliLF1MgYA0uhEiQ+xYaNy9MDpp0iQGlKTgAT2iHAFpdCOh5cuXjx8/vhyujdep0U+ZMkUZvSOuGqNJo+sBkogyqN7s21SWKYuasLRJ2WiKkAoBaXQ9RhLRiRMnOgJduHAhi5ooEXXEVXs0aXR9IjpgwAD3bUjHjRtHM2rt6PUERwIVjPFxfGK7i8Y8u+eee87RbFaBZKcR96qV42MVLYFA3tNRBDd58mQWv01gZC6x4vPll18ugRog2QRyrVGmKbNZKH8urCmGsguZ9rt3YZVunPxqdNWqVUcddRQbhbkAZYfmgw8+mE1zXCIrTroEcqpRJtGPGDGCXcFdaLLZPfs3S6AurOoRJ3capRbP+njXXHMNxVAXoGzcOGjQIAnUhVWd4rS/en0wPYNF7Ksgwm7K7Bf68ccf9+/fv+ztrIk3YcKEqVOnqgxallVdI3iRjjKYw11z7N09atQo6uPk145DjIlGZDTHpt/c7iLQWbNm9evXj6Ue/UlBodStWzdHNTBY2zGm/9EaplHyXERDwobabrnlFnaPdYTF4rQ333wz4+imT59+zDHHID4eUihWnswhD6faHkh56NChRG5paWHnmrJvofTJCL0xY8Ywscn9l1P2sdVFMJQon1RE6cILL+QWCICCh1T3dk/u2iSbjAzFrFu3jhltIAvW7Bw2bNghhxzCEp6DBw+uRQo8cM6cOQ9v+AuYDhkypE+fPix4y6eRCtKH5NhvSfMnHfH879mzZ8azlODDlFT4MKGKL+JDaqdEW8QHH3xAvrFgwYJ58+bxwGDKKzSYJ9ipUydmtPLnCKchegVFc3NzFhrld3zuueciGqaz0QDO6I1aRBkHCzdzqYon40v6mW666SYk0r1794zVic1IZ/To0Qzp57dBbs4nQImBf+mqBz4sE0TKSoA1rRYvXoxq+faZM2em+6I4B1VxPiONIlBSMrLaKkys3y34iTZ5kky2tSVP7NGjRxXiTsU83DBy5Ejy8VSeVulDKCmR5/hT5g7ZH2i07vV6svgDDzww9O6MD/nUZcuW4Y/W1lbyvrlz51LoZK/vrl27du7cubEewrZsiluRzMnTgkJF5FVPTtZdo4iAhRLcN+SsnQte5yErV65csmQJg+6QJv85SY5GIYyZnJTGGiiL0AdiD4vwU+0Lnc/mECb+j+HKqDxKapoN9OAtVAUIBCuIZF++rPRLKQ5lzKfQwkYVcgptiAuTslBnqns6yutRif9CicOUwXnxSYbcsPbRZLN0VQQMAWnUoFDAUwLSqKeOkVmGgDRqUCjgKQFp1FPHyCxDQBo1KBTwlIA06qljZJYhII0aFAp4SkAa9dQxMssQkEYNCgU8JSCNeuoYmWUISKMGhQKeEpBGPXWMzDIEpFGDQgFPCUijnjpGZhkC0qhBoYCnBKRRTx0jswwBadSgUMBTAtKop46RWYaANGpQKOApAWnUU8fILENAGjUoFPCUgDTqqWNkliEgjRoUCnhKQBr11DEyyxCQRg0KBTwlII166hiZZQhIowaFAp4SkEY9dYzMMgSkUYNCAU8JSKOeOkZmGQLSqEGhgKcEpFFPHSOzDAFp1KBQwFMC0qinjpFZhoA0alAo4CkBadRTx8gsQ0AaNSgU8JSANOqpY2SWISCNGhQKeEpAGvXUMTLLEJBGDQoFPCUgjXrqGJllCEijBoUCnhKQRj11jMwyBKRRg0IBTwlIo546RmYZAtKoQaGApwSkUU8dI7MMAWnUoFDAUwLSqKeOkVmGgDRqUCjgKQFp1FPHyCxDQBo1KBTwlIA06qljZJYhsFlbW5s5UEAEvCKAOP/999/NmpubvTJLxoiAIYBAm5qa/h9gTzpyvBj7LQAAAABJRU5ErkJggg=="
        />
      </Defs>
    </Svg>
  );
}

export default News;