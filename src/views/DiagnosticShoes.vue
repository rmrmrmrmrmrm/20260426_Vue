<script setup>
import { ref, computed } from 'vue'

// 1. 選択肢
const footLength = ref(null)
const footWidth = ref(null)

const lengthOptions = [
    21.0, 21.1, 21.2, 21.3, 21.4, 21.5, 21.6, 21.7, 21.8, 21.9,
    22.0, 22.1, 22.2, 22.3, 22.4, 22.5, 22.6, 22.7, 22.8, 22.9,
    23.0, 23.1, 23.2, 23.3, 23.4, 23.5, 23.6, 23.7, 23.8, 23.9,
    24.0, 24.1, 24.2, 24.3, 24.4, 24.5, 24.6, 24.7, 24.8, 24.9,
    25.0, 25.1, 25.2, 25.3, 25.4, 25.5, 25.6, 25.7, 25.8, 25.9,
    26.0, 26.1, 26.2, 26.3, 26.4, 26.5, 26.6, 26.7, 26.8, 26.9,
    27.0
]
const widthOptions = [
    21.6, 21.7, 21.8, 21.9,
    22.0, 22.1, 22.2, 22.3, 22.4, 22.5, 22.6, 22.7, 22.8, 22.9,
    23.0, 23.1, 23.2, 23.3, 23.4, 23.5, 23.6, 23.7, 23.8, 23.9,
    24.0, 24.1, 24.2, 24.3, 24.4, 24.5, 24.6, 24.7, 24.8, 24.9,
    25.0, 25.1, 25.2, 25.3, 25.4, 25.5, 25.6, 25.7, 25.8, 25.9,
    26.0, 26.1, 26.2, 26.3, 26.4, 26.5, 26.6, 26.7, 26.8, 26.9,
    27.0, 27.1, 27.2, 27.3, 27.4, 27.5, 27.6
]

// 2. 判定データ
const sizeTable = [
    { length: 21.0, E: 21.6, E2: 22.2, E3: 22.8 },
    { length: 21.5, E: 21.9, E2: 22.5, E3: 23.1 },
    { length: 22.0, E: 22.2, E2: 22.8, E3: 23.4 },
    { length: 22.5, E: 22.5, E2: 23.1, E3: 23.7 },
    { length: 23.0, E: 22.8, E2: 23.4, E3: 24.0, E4: 24.6, E5: 25.2 },
    { length: 23.5, E: 23.1, E2: 23.7, E3: 24.3, E4: 24.9, E5: 25.5 },
    { length: 24.0, E: 23.4, E2: 24.0, E3: 24.6, E4: 25.2, E5: 25.8 },
    { length: 24.5, E: 23.7, E2: 24.3, E3: 24.9, E4: 25.5, E5: 26.1 },
    { length: 25.0, E: 24.0, E2: 24.6, E3: 25.2, E4: 25.8, E5: 26.4 },
    { length: 25.5, E: 24.3, E2: 24.9, E3: 25.5, E4: 26.1, E5: 26.7 },
    { length: 26.0, E: 24.6, E2: 25.2, E3: 25.8, E4: 26.4, E5: 27.0 },
    { length: 26.5, E: 24.9, E2: 25.5, E3: 26.1, E4: 26.7, E5: 27.3 },
    { length: 27.0, E: 25.2, E2: 25.8, E3: 26.4, E4: 27.0, E5: 27.6 }
]

// 回答時の処理
const result = computed(() => {
    if (!footLength.value || !footWidth.value) return null

    // ① 足長を最も近い規格に切り上げ
    const nearestLength =
        Math.ceil(footLength.value * 2) / 2

    const row = sizeTable.find(r => r.length === nearestLength)
    if (!row) return null

    const w = footWidth.value

    // ② 足囲でワイズ判定
    if (w <= row.E) return { length: nearestLength, width: 'E' }
    if (w <= row.E2) return { length: nearestLength, width: '2E' }
    if (w <= row.E3) return { length: nearestLength, width: '3E' }
    if (row.E4 && w <= row.E4) return { length: nearestLength, width: '4E' }
    if (row.E5 && w <= row.E5) return { length: nearestLength, width: '5E' }

    // 規格外
    return { length: nearestLength, width: 'ー' }
})

// URL生成
const productUrl = computed(() => {
    if (!result.value) return ''

    // 足長：23.0 → 230
    const lengthParam = Math.round(result.value.length * 10)

    // ワイズ：3E → 03
    const widthNumber = result.value.width.replace('E', '')
    const widthParam = widthNumber.padStart(2, '0')

    return `https://www.sample.co.jp/shoes/PAGE_ID/?sig=Length${lengthParam}&tan=Width${widthParam}`
})

// リセット処理

</script>

<style>
.app {
    text-align: center;
}

.action a {
    display: inline-block;
    padding: 10px 16px;
    background: #333;
    color: #fff;
    text-decoration: none;
}

.action a.disabled {
    pointer-events: none;
    opacity: 0.4;
}

.action p {
    font-size: 10px;
}

.sizelist p {
    font-size: 10px;
}

table {
    /* display: block; */
    /* セルの幅を均等にする */
    table-layout: fixed;
    /* セル内テキストを折り返す */
    word-break: break-all;
    border-collapse: collapse;
    border-spacing: 0;
    letter-spacing: 0.1em;
    font-size: 0.8em;
    line-height: 1.5em;
    margin: 1em auto;
}

tr:nth-child(even) {
    background-color: #fafafa;
}

tr td:nth-child(1) {
    font-weight: bold;
}

th,
td {
    border: 1px solid #bbb;
    padding: 0.5em;
    font-weight: normal;
    vertical-align: middle;
}

th {
    font-weight: bold;
    background: #eee;
    text-align: center;
}

td {
    /* width: 10%; */
}
</style>

<template>
    <div id="app" class="app">
        <h1>靴サイズ</h1>

        <!-- 診断中 -->
        <h2>計測結果を入力して、<br>商品サイズをチェック</h2>
        <div class="form-group">
            <label for="length">足長：</label>
            <select v-model.number="footLength">
                <option disabled value="">選択してください</option>
                <option v-for="size in lengthOptions" :key="size" :value="size">
                    {{ size }} cm
                </option>
            </select>
        </div>
        <div class="form-group">
            <label for="width">足囲：</label>
            <select v-model.number="footWidth">
                <option disabled value="">選択してください</option>
                <option v-for="size in widthOptions" :key="size" :value="size">
                    {{ size }} cm
                </option>
            </select>
        </div>
        <!-- 
        <div class="debug">
            入力値: {{ footLength }} cm / {{ footWidth }} cm
        </div>-->

        <!-- 診断完了 -->
        <div class="result">
            <h3>↓↓↓あなたの靴のサイズは↓↓↓</h3>
            <div v-if="result">
                <p>
                    {{ result.length }} cm / {{ result.width }}
                </p>
            </div>
            <div v-else>
                <p>サイズを選択してください</p>
            </div>
            <div class="action">
                <a :href="productUrl" :class="{ disabled: !result }">
                    商品一覧を見る
                </a>
                <p>{{ productUrl }}</p>
            </div>
        </div>

        <!-- サイズ表 -->
        <div class="sizelist">
            <h2>サイズ表</h2>
            <p>※参考値です。実際のサイズは、商品ページをご確認ください。</p>
            <table>
                <thead>
                    <tr>
                        <th rowspan="3">足長</th>
                        <th colspan="5">足囲（ワイズ）</th>
                    </tr>
                    <tr>
                        <th rowspan="2">E</th>
                        <th rowspan="2">2E</th>
                        <th rowspan="2">3E</th>
                        <th colspan="2">ゆったり幅広</th>
                    </tr>
                    <tr>
                        <th>4E</th>
                        <th>5E</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>21.0</td>
                        <td>〜21.6</td>
                        <td>〜22.2</td>
                        <td>〜22.8</td>
                        <td>ー</td>
                        <td>ー</td>
                    </tr>
                    <tr>
                        <td>21.5</td>
                        <td>〜21.9</td>
                        <td>〜22.5</td>
                        <td>〜23.1</td>
                        <td>ー</td>
                        <td>ー</td>
                    </tr>
                    <tr>
                        <td>22.0</td>
                        <td>〜22.2</td>
                        <td>〜22.8</td>
                        <td>〜23.4</td>
                        <td>ー</td>
                        <td>ー</td>
                    </tr>
                    <tr>
                        <td>22.5</td>
                        <td>〜22.5</td>
                        <td>〜23.1</td>
                        <td>〜23.7</td>
                        <td>ー</td>
                        <td>ー</td>
                    </tr>
                    <tr>
                        <td>23.0</td>
                        <td>〜22.8</td>
                        <td>〜23.4</td>
                        <td>〜24.0</td>
                        <td>〜24.6</td>
                        <td>〜25.2</td>
                    </tr>
                    <tr>
                        <td>23.5</td>
                        <td>〜23.1</td>
                        <td>〜23.7</td>
                        <td>〜24.3</td>
                        <td>〜24.9</td>
                        <td>〜25.5</td>
                    </tr>
                    <tr>
                        <td>24.0</td>
                        <td>〜23.4</td>
                        <td>〜24.0</td>
                        <td>〜24.6</td>
                        <td>〜25.2</td>
                        <td>〜25.8</td>
                    </tr>
                    <tr>
                        <td>24.5</td>
                        <td>〜23.7</td>
                        <td>〜24.3</td>
                        <td>〜24.9</td>
                        <td>〜25.5</td>
                        <td>〜26.1</td>
                    </tr>
                    <tr>
                        <td>25.0</td>
                        <td>〜24.0</td>
                        <td>〜24.6</td>
                        <td>〜25.2</td>
                        <td>〜25.8</td>
                        <td>〜26.4</td>
                    </tr>
                    <tr>
                        <td>25.5</td>
                        <td>〜24.3</td>
                        <td>〜24.9</td>
                        <td>〜25.5</td>
                        <td>〜26.1</td>
                        <td>〜26.7</td>
                    </tr>
                    <tr>
                        <td>26.0</td>
                        <td>〜24.6</td>
                        <td>〜25.2</td>
                        <td>〜25.8</td>
                        <td>〜26.4</td>
                        <td>〜27.0</td>
                    </tr>
                    <tr>
                        <td>26.5</td>
                        <td>〜24.9</td>
                        <td>〜25.5</td>
                        <td>〜26.1</td>
                        <td>〜26.7</td>
                        <td>〜27.3</td>
                    </tr>
                    <tr>
                        <td>27.0</td>
                        <td>〜25.2</td>
                        <td>〜25.8</td>
                        <td>〜26.4</td>
                        <td>〜27.0</td>
                        <td>〜27.6</td>
                    </tr>
                </tbody>
            </table>
        </div>

    </div>
</template>